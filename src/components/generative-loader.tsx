export default function GenerativeLoader() {
  return (
    <div className="loading-container animate-pulse">
      <div className="flex items-center justify-center w-full h-full">
        {/* <Image
          src="/Slinelogo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mx-auto opacity-50 -translate-y-px"
        /> */}
      </div>
      <div className="ring-xl-container animate-spin duration-200">
        <div className="ring ring-xl"></div>
      </div>
      <div className="ring-l-container animate-spin duration-300">
        <div className="ring ring-l"></div>
      </div>
      <div className="ring-m-container animate-spin duration-500">
        <div className="ring ring-m"></div>
      </div>
      <div className="ring-s-container animate-spin duration-750">
        <div className="ring ring-s"></div>
      </div>
    </div>
  );
}
