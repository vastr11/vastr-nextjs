import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, customerName, customerEmail, items, total, address, paymentMethod } = body;

    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e8e0d5; font-family: Georgia, serif;">${item.product_name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e8e0d5; font-family: Georgia, serif;">Size: ${item.size}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e8e0d5; font-family: Georgia, serif;">x${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e8e0d5; font-family: Georgia, serif;">Rs. ${(item.product_price * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('');

    // Customer ko email
    await resend.emails.send({
      from: 'VASTR <orders@vastr.pk>',
      to: customerEmail,
      subject: `Order Confirm — #${orderId.slice(0, 8).toUpperCase()}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Georgia, serif; color: #1a1a1a;">
          <div style="background-color: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; letter-spacing: 0.1em; margin: 0;">VASTR</h1>
          </div>
          
          <div style="padding: 40px 32px; background-color: #f5f0eb;">
            <h2 style="font-size: 22px; margin-bottom: 8px;">Shukriya, ${customerName}!</h2>
            <p style="color: #5a5a5a; font-size: 16px;">Aapka order receive ho gaya hai.</p>
            
            <div style="background-color: #ffffff; padding: 24px; margin: 24px 0;">
              <p style="font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a8a8a; margin-bottom: 4px;">Order Number</p>
              <p style="font-size: 18px; font-weight: bold;">#${orderId.slice(0, 8).toUpperCase()}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <thead>
                <tr style="background-color: #1a1a1a; color: #ffffff;">
                  <th style="padding: 10px; text-align: left; font-size: 12px; letter-spacing: 0.1em;">Product</th>
                  <th style="padding: 10px; text-align: left; font-size: 12px; letter-spacing: 0.1em;">Size</th>
                  <th style="padding: 10px; text-align: left; font-size: 12px; letter-spacing: 0.1em;">Qty</th>
                  <th style="padding: 10px; text-align: left; font-size: 12px; letter-spacing: 0.1em;">Price</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>

            <div style="text-align: right; padding: 16px 0; border-top: 2px solid #1a1a1a;">
              <p style="font-size: 18px; font-weight: bold;">Total: Rs. ${total.toLocaleString()}</p>
            </div>

            <div style="background-color: #ffffff; padding: 24px; margin-top: 24px;">
              <p style="font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a8a8a; margin-bottom: 8px;">Delivery Address</p>
              <p style="font-size: 15px;">${address}</p>
              <p style="font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a8a8a; margin-top: 16px; margin-bottom: 8px;">Payment</p>
              <p style="font-size: 15px;">${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
            </div>
          </div>

          <div style="background-color: #1a1a1a; padding: 24px; text-align: center;">
            <p style="color: #8a8a8a; font-size: 13px;">© 2025 VASTR. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    // Admin ko email
    await resend.emails.send({
      from: 'VASTR Orders <orders@vastr.pk>',
      to: process.env.ADMIN_EMAIL!,
      subject: `Naya Order — #${orderId.slice(0, 8).toUpperCase()} — Rs. ${total.toLocaleString()}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Georgia, serif;">
          <h2>Naya Order Aya Hai!</h2>
          <p><strong>Order ID:</strong> #${orderId.slice(0, 8).toUpperCase()}</p>
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Payment:</strong> ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
          <p><strong>Total:</strong> Rs. ${total.toLocaleString()}</p>
          <h3>Items:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #1a1a1a; color: white;">
                <th style="padding: 8px;">Product</th>
                <th style="padding: 8px;">Size</th>
                <th style="padding: 8px;">Qty</th>
                <th style="padding: 8px;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Email send karne mein masla' }, { status: 500 });
  }
}