export default function middleware(request: Request) {
  const auth = request.headers.get('authorization');
  const password = process.env.BASIC_AUTH_PASSWORD || 'today2027';

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [, pwd] = decoded.split(':');
      if (pwd === password) {
        return;
      }
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="CRM Report"',
    },
  });
}
