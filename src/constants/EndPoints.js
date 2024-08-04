const url = "https://upskilling-egypt.com:3006/api/v1";

const baseUsers = `${url}/Users`;

export const usersUrls = {
  login: `${baseUsers}/Login`,
  register: `${baseUsers}/Register`,
  delete: (id) => `${baseUsers}/${id}`,
  resetRequest: `${baseUsers}/Reset/Request`,
  reset: `${baseUsers}/Reset`,
};
