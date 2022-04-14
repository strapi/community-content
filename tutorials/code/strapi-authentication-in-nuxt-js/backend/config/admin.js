module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'aca76b99b4cbead474304f6eb13c529a'),
  },
});
