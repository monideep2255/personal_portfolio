export const handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      env_check: {
        DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
        DATABASE_URL_length: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0,
        EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING',
        EMAIL_PASSWORD_length: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 0,
        ADMIN_USERNAME: process.env.ADMIN_USERNAME ? 'SET' : 'MISSING',
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'SET' : 'MISSING',
        NODE_ENV: process.env.NODE_ENV || 'undefined',
        all_env_keys: Object.keys(process.env).filter(key => 
          key.includes('DATABASE') || 
          key.includes('EMAIL') || 
          key.includes('ADMIN')
        )
      },
      message: 'Environment variables debug check'
    })
  };
};