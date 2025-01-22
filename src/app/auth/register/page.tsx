import SignUpForm from '@/components/SignUpForm';

const SignUp = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Create a New Account</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
