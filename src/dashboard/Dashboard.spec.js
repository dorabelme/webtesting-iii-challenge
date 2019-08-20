// Test away
import React from 'react';
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';
import Dashboard from "./Dashboard";

afterEach(rtl.cleanup);

describe('testing <Dashboard /> component', () => {
    it('renders without crashing', () => {
        rtl.render(<Dashboard />);
    });

    it('default state open and unlocked', () => {
        const { getByText } = rtl.render(<Dashboard />)
        // verify open and unlocked
        getByText(/^open$/i);
        getByText(/^unlocked$/i);

        const lockedBtn = getByText(/^lock gate$/i);
        const closedBtn = getByText(/^close gate$/i);
    })

    it('defaults to correct values open and unlocked', () => {
        // ready to test!
        const wrapper = rtl.render(<Dashboard />);
        const container = wrapper.getByTestId("displayContainer").textContent
        expect(container).toBe("UnlockedOpen");
    });

})