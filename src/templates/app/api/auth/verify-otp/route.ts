import { NextResponse } from 'next/server';
import { verifyOTP, createSession } from '../../../../utils/auth';

export async function POST(request: Request) {
  try {
    const { userId, otp, email } = await request.json();
    console.log('Received OTP verification request:', { userId, otp, email });

    if (!userId || !otp || !email) {
      console.log('Missing userId, otp, or email in request');
      return NextResponse.json(
        { error: 'User ID, OTP, and email are required' },
        { status: 400 }
      );
    }

    const isValid = verifyOTP(userId, otp);
    console.log('OTP verification result for userId:', userId, 'isValid:', isValid);

    if (!isValid) {
      console.log('Invalid or expired OTP for userId:', userId);
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Create session after successful verification
    const token = await createSession(userId);


    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}