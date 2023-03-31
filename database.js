const USERS = {
  dadashbala: 'muellim1234',
  tukezban: 'xala1234',
  gulxanim: 'xanimqiz1234',
};

const BALANCES = {
  dadashbala: 500,
  tukezban: 500,
  gulxanim: 500,
};

const TRANSACTIONS = {
  dadashbala: [
    {
      from: 'Bank',
      to: 'dadashbala',
      amount: '+$500',
      description: 'Bayram payı',
    },
  ],
  tukezban: [
    {
      from: 'Bank',
      to: 'tukezban',
      amount: '+$500',
      description: 'Bayram payı',
    },
  ],
  gulxanim: [
    {
      from: 'Bank',
      to: 'tukezban',
      amount: '+$500',
      description: 'Bayram payı',
    },
  ],
};

const SESSIONS = {}; // session_id => username

module.exports = {
  USERS,
  BALANCES,
  SESSIONS,
  TRANSACTIONS,
};
