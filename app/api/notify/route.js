import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, courseCount, maxFreeCourses, type } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let subject, html;
    
    if (type === 'approaching_limit') {
      const coursesLeft = maxFreeCourses - courseCount;
      subject = `You're close to your course limit!`;
      html = `
        <h1>Course Limit Approaching</h1>
        <p>You've created ${courseCount} out of ${maxFreeCourses} free courses.</p>
        <p>Only ${coursesLeft} course${coursesLeft === 1 ? '' : 's'} left in your free tier!</p>
        <p>Upgrade to our Pro plan to create unlimited courses and unlock premium features.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/upgrade" style="display: inline-block; padding: 10px 20px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">Upgrade Now</a>
      `;
    } else if (type === 'limit_reached') {
      subject = 'Course Limit Reached';
      html = `
        <h1>Course Limit Reached</h1>
        <p>You've reached the maximum number of free courses (${maxFreeCourses}).</p>
        <p>Upgrade to our Pro plan to continue creating courses and access premium features.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/upgrade" style="display: inline-block; padding: 10px 20px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">Upgrade Now</a>
      `;
    } else {
      return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Course Generator <notifications@yourdomain.com>',
      to: [email],
      subject,
      html,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending notification email:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
