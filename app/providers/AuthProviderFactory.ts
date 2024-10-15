import { AuthProvider } from "./AuthProvider";

//Providers
import { emailAuthProvider } from "./EmailAuthProvider";
import { vippsAuthProvider } from "./VippsAuthProvider";

const AuthProviderFactory = (providerType: string): AuthProvider => {
  switch (providerType) {
    case "email":
      return emailAuthProvider;
    case "vipps":
      return vippsAuthProvider;
    // Add more providers here (e.g., Google, Facebook)
    default:
      throw new Error(`Unknown provider: ${providerType}`);
  }
};

export default AuthProviderFactory;
