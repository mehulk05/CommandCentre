export interface User {
  accessToken: string;
  refreshToken: string;
  idToken: string;

  id: number;
  username: string;
  firstName: string;
  lastName: string;
  businessId: string;
  roles: string;
  permissions: Array<string>;
  profileImageUrl: string;
  designation: string;
  logoUrl: string;
  supportUser: boolean;
}
