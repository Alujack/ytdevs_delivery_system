import SignInForm from '@/components/SigninForm';

const SignIn = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Sign In to Your Account</h1>
      <SignInForm />
    </div>
  );
};

export default SignIn;
