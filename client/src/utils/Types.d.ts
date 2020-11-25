export type User = {
  id: string,
  token: string,
  firstName: string,
  lastName: string,
  email: string,
  avatar: string | null
};

export type Message = {
  from: string,
  to: string,
  text: string
}