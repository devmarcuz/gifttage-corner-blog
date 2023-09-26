exports.shortenEmail = (email) => {
  if (email.length <= 8) {
    return email;
  }

  const username = email.substring(0, 10);
  const domain = email.substring(email.indexOf("@"));

  return `${username}...${domain}`;
};
