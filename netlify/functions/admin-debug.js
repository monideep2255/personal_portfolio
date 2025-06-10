export const handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      admin_username: process.env.ADMIN_USERNAME,
      admin_password: process.env.ADMIN_PASSWORD,
      all_admin_vars: Object.keys(process.env).filter(key => key.includes('ADMIN'))
    })
  };
};