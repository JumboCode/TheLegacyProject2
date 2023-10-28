interface IAdminLayout {
  children: React.ReactNode;
}

// @TODO - Add navigation bar
const AdminLayout = ({ children }: IAdminLayout) => {
  return (
    <div className="grid h-full w-full grid-cols-12">
      <div className="col-span-2 bg-[#E7E0D6]"></div>
      <div className="col-span-10 bg-[#F4F0EB]">{children}</div>
    </div>
  );
};

export default AdminLayout;
