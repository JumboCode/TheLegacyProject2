const PublicLayout = async () => {
  return (
    <div className="flex w-full flex-col justify-center gap-y-4 py-6">
      <span className="pt-6 text-center text-3xl font-semibold sm:text-left sm:text-4xl">
        Meet TLP
      </span>
      <p className="leading-7">
        The Legacy Project, Inc. (TLP) connects college students with local
        elders in their community with the purpose of building strong
        intergenerational relationships and documenting the life histories of
        seniors, ensuring that their legacies are preserved for years to come.
        Join an ever-growing network of college students across the country
        passionate about telling stories, and form a Legacy Project chapter at
        your school today.
      </p>
      <div className="relative flex justify-center">
        <div className="mt-4 h-20 w-20 rounded-full bg-[#D9D9D9]"></div>
      </div>
      <span className="pt-6 text-center text-3xl font-semibold sm:text-left sm:text-4xl">
        Our Team
      </span>
      <span className="pt-6 text-center text-3xl font-semibold sm:text-left sm:text-4xl">
        Press
      </span>
    </div>
  );
};
export default PublicLayout;
