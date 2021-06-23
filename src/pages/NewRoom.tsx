import {Link} from 'react-router-dom'

import IlustrationImg from "../assets/images/illustration.svg";
import Logo from "../assets/images/logo.svg";
import '../styles/auth.scss'
import { Button } from "../components/Button";
//import { useAuth } from '../hooks/useAuth';


export function NewRoom() {
  
//const { user} = useAuth();
  

  return (
    <>
      <div id="page-auth" className="">
        <aside>
        
            <img
              src={IlustrationImg}
              alt="ILustração simbolizando perguntas e respostas"
            />
            <strong> Crie salas de Q&amp;A ao vivo </strong>
            <p> Tire as dúvidas da sua audiencia em tempo real</p>
       
        </aside>

        <main>
          <div className="main-content">
            <img src={Logo} alt="Let me ask" />
            <h2> Criar uma nova sala</h2>
            <form action="">
              <input type="text" placeholder="Nome da sala" />
              <Button type="submit"> Criar sala</Button>
            </form>
             <p> Quer entrar em uma sala exitente? <Link to="/"> clique aqui</Link> </p>
          </div>
        </main>
      </div>
    </>
  );
}