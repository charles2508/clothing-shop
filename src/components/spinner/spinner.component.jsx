import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const Spinner = () => {
    return(
        <SpinnerContainer data-testid='spinner'>
            <SpinnerOverlay/>
        </SpinnerContainer>
    )
}

export default Spinner;
