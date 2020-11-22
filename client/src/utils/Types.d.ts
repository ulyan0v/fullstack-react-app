declare module "*.jpg" {
  const value: string;
  export default value;
}

export type User = {
  id?: string | number,
  token?: string,
  firstName: string,
  lastName: string,
  email: string,
  avatar?: string | null
};