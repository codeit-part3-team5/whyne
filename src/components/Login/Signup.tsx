import SignupForm from "./SignupForm";

const Signup: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white border border-solid border-gray300 px-[3rem] py-[5rem] rounded-2xl">
        <div className="w-[25rem] flex flex-col items-center">
          <img
            alt="logo-image"
            className="w-[6.5rem] select-none pointer-events-none"
            src="/images/logo-2x.png"
          />
          <SignupForm />
          <div className="mt-[2.5rem] text-gray500">
            계정이 이미 있으신가요? <a className="text-purple underline font-medium">로그인하기</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
