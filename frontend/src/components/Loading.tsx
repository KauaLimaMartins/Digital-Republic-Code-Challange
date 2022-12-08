export function Loading() {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 p-10 rounded-lg relative flex items-center w-full">
            <div
              style={{ borderTopColor: "transparent" }}
              className="w-14 h-14 border-4 border-cyan-600 rounded-full animate-spin"
            ></div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
