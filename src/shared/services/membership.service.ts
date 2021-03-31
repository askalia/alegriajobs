// Add your API key here.
const API_KEY = "6ccf9abdc1c018407f47489a76a93dc8";
const FREE_PLAN_ID = "d96f6b46065c8ccdfc0b8b00f056ec09";
const USER_ID_TO_FETCH = "...";
const USER_ID_TO_UPDATE = "...";
const USER_ID_TO_DELETE = "...";

console.log("✨ Uncomment methods to start interacting with the API!");

const headers = () => ({
    headers: { "X-API-KEY": API_KEY }
})

/*----*/
/* Uncomment this method to receive all members of your website */
// getMembers();
/*------*/

/*------*/
/* Uncomment this method to receive the member with the passed id. */
/* ✨ Don't forget to add a value for USER_ID  */
// getMember()
/*------*/

/*------*/
/* Uncomment this method to add a member to your website. */
/* ✨ Don't forget to add a value for email, password, and a free plan id! */
// addMember()
/*------*/

/*------*/
/* Uncomment this method to update a member's data. */
/* ✨ Don't forget to add a value for USER_ID  */
// updateMember()
/*------*/

/*------*/
/* Uncomment this method to delete a member. */
//  ✨ Don't forget to add a value for USER_ID
// ⚠️ Careful: The user with this id will be permanently deleted! ⚠️
// deleteMember()
/*------*/

interface IMember { 
    email: string;
    password: string;
}

interface IMemberUpdate {
    email?: IMember['email'];
    password?: IMember['password'];
}

async function getMember(memberId: string) {
  const res = await fetch(
    `https://api.memberstack.com/v1/members/${memberId}`,
    headers()
  );

  const getMemberResponse = await res.json();
  console.log(getMemberResponse);
  return getMemberResponse;
}

async function createMember(memberCredentials: IMember) {
  const res = await fetch("https://api.memberstack.com/v1/members", {
    method: "POST",
    ...headers(),
    body: JSON.stringify({
      ...memberCredentials,
      plan: FREE_PLAN_ID
    })
  });

  const addMemberResponse = await res.json();
  console.log(addMemberResponse);
  return addMemberResponse;
}

async function updateMember(memberId, dataUpdate: IMemberUpdate) {
  const res = await fetch(
    `https://api.memberstack.com/v1/members/${memberId}`,
    {
      method: "POST",
      ...headers(),
      body: JSON.stringify(dataUpdate)
    }
  );

  const updateMemberResponse = await res.json();
  console.log(updateMemberResponse);
  return updateMemberResponse;
}

export const membershipService = {
    updateMember,
    createMember,
    getMember
}