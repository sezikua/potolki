import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'Labell - Натяжні стелі в Києві';
  const description = searchParams.get('description') || 'Преміум якість від Labell';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(to bottom, #ffffff, #f3f4f6)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            maxWidth: '1200px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#4b5563',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            {description}
          </div>
          <div
            style={{
              marginTop: 48,
              fontSize: 24,
              color: '#E5532A',
              fontWeight: 'bold',
            }}
          >
            labell.kiev.ua
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
