import CodeGenerator from '../../components/codegenerator'; 
import Navbar_generator from '../../components/Navbar-generator'; 

export default function CodeGeneratorPage() {
  return (
      <div className="">
            <Navbar_generator/>
            <main className="mt-20">
                  <CodeGenerator />
            </main>
      </div>
  );
}