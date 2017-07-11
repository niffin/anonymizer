function anonymize (fieldsToAnonymize = [], data = []) {
  const idToAnonMap = data.reduce((userMap, user, index) => {
    const uniqueId = getUniqueId(user);

    userMap[uniqueId] = 'Anon ' + index;

    return userMap;
  }, {});

  return data.map(user => {
    const uniqueId = getUniqueId(user),
          anonymizedData = fieldsToAnonymize.reduce((anonUser, prop) => {
            anonUser[prop] = idToAnonMap[uniqueId];
            return anonUser;
          }, {});
    return Object.assign({}, user, anonymizedData);
  });
}

function getUniqueId (user) {
  return user.member_id + '' + user.person_code;
}

module.exports = anonymize;
