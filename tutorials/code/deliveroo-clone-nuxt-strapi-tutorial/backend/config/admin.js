module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'e9a35da2d981d084b59dcdef60d9cc44'),
  },
});
