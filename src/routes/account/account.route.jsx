import Tabs from "../../components/tabs/tabs.component";
import useDocumentTitle from "../../hooks/document-title.hook";

const Account = () => {
  useDocumentTitle("My Account | Cannabud");

  return (
    <div className="bg-main min-h-screen pt-8 py-24 px-6">
      <Tabs />
    </div>
  );
};

export default Account;
