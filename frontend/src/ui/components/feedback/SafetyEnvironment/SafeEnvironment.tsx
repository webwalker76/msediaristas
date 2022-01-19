import {SafeEnvironmentContainer} from "./SafeEnvironment.style";
import { Container } from "@material-ui/core";
const SafeEnvironment = () => {
    return  <SafeEnvironmentContainer>
         <Container>
         Ambiente 100% Seguro<i className={"twf-lock"} />
         </Container>
         </SafeEnvironmentContainer>
}


export default SafeEnvironment;