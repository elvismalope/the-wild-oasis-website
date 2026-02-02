import { usePathname, useRouter } from "next/navigation";

function useClientSearchParams(searchParams) {
  const router = useRouter();
  const pathname = usePathname();

  function setParams(params = {}, routerOptions) {
    const urlParams = new URLSearchParams(searchParams);
    Object.keys(params).forEach((key) => {
      urlParams.set(key, params[key]);
    });
    router.replace(`${pathname}?${urlParams.toString()}`, routerOptions);
  }
  return setParams;
}

export default useClientSearchParams;
