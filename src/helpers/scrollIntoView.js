export const scrollIntoView = (position, ref) => {
  if (ref.current) {
    ref.current.parentNode.scrollTo({
      top: position,
      behavior: "smooth"
    });
  }
};
