import { render, screen } from '@testing-library/react';
import Button from '../button.component';
import { BUTTON_TYPE_CLASSES } from '../button.component';

describe('button tests', () => {
    test('should render base button when nothing is passed', () => {
        render(<Button>Test</Button>);
        const buttonElement = screen.getByText(/test/i);
        // or: screen.getByRole('button'); //accessibility tree feature
        
        expect(buttonElement).toHaveStyle('background-color: black');
    });

    test('should render google sign in button when passed google button type', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google}>Test</Button>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveStyle('background-color: #4285f4');
    });

    test('should render Inverted button when passed inverted button type', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Test</Button>);
        const buttonElement = screen.getByRole('button');   
        expect(buttonElement).toHaveStyle('background-color: white');
    });

    test('should be disabled if isLoading is true', () => {
        render(<Button isLoading={true}>Test</Button>);
        const buttonElement = screen.getByRole('button');   
        expect(buttonElement).toHaveStyle('background-color: black');
        expect(buttonElement).toBeDisabled();
    });
})