const anonymize               = require('./index'),
      users                   = require('./sample.json'),
      { FIELDS_TO_ANONYMIZE } = require('./constants');

describe('anonymize', function () {
  it('replaces the fields provided with scrubbed data', function () {
    const anonUsers = anonymize(FIELDS_TO_ANONYMIZE, users);

    anonUsers.map((anonUser, i) => {
      FIELDS_TO_ANONYMIZE.map(prop => {
        expect(anonUsers[i][prop]).not.toBe(users[i][prop]);
      });
    });
  });

  it('maintains the same unique identifier for the same users', function () {
    const sampleUser        = users[1],
          singleUserRecords = users.filter(user => {
            return (
              user.member_id === sampleUser.member_id &&
              user.person_code === sampleUser.person_code
            );
          }),
          anonUserRecords = anonymize(FIELDS_TO_ANONYMIZE, singleUserRecords);

    // verify that we have enough test data
    expect(singleUserRecords.length).toBeGreaterThan(1);

    anonUserRecords.map(anonUser => {
      FIELDS_TO_ANONYMIZE.map(prop => {
        expect(anonUser[prop]).toBe(anonUserRecords[0][prop]);
      });
    });
  });
});
