const authConstants = {
  jwt: {
    secret: '6673620dc356e8d339fbb89adebe2a4dbc27c1f0c347942d159c2254187d9fc9a029f6c6199128b28a6d1e382fbab261d8b92d8dd361d43f29bacd8238134ce1',
    expirationTime: {
      accessToken: '1d',
      refreshToken: '1',
    },
    secrets: {
      accessToken: '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282',
      refreshToken: 'c49563241f9ee0d37062590a76e887e86e3d6ef722fef53d114b00548310592839f27fec9dba1431555c071eceb419592b45aea42870c9c09f05db964c8faeea',
    },
  },
  mailer: {
    verifyEmail: {
      subject: 'Email Verification',
      template: 'verify-password',
    },
  },
  redis: {
    expirationTime: {
      jwt: {
        accessToken: 86400, // 1d
        refreshToken: 604800, // 7d
      },
    },
  },
};

export default authConstants;
