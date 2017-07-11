function anonymize (fieldsToAnonymize = [], data = []) {
  const idToAnonMap = {};

  return data.map((user, index) => {
    const uniqueId       = getUniqueId(user),
          anonymizedData = fieldsToAnonymize.reduce((anonUser, prop) => {
            if (!idToAnonMap[uniqueId]) {
              idToAnonMap[uniqueId] = 'Anon ' + index;
            }
            anonUser[prop] = idToAnonMap[uniqueId];
            return anonUser;
          }, {});

    return Object.assign({}, user, anonymizedData);
  });
}

function getUniqueId (user = {}) {
  return user.member_id + '' + user.person_code;
}

module.exports = anonymize;
