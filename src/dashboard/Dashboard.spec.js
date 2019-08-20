// Test away
import React from 'react';
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';
import Dashboard from "./Dashboard";

afterEach(rtl.cleanup);

describe('testing Dashboard component', () => {
    it('shows the controls and display', () => {
        // ready to test!
        const wrapper = rtl.render(<Dashboard />);
    });

    it('Defaults to correct values', () => {
        // ready to test!
        const wrapper = rtl.render(<Dashboard />);
        const container = wrapper.getByTestId("displayContainer").textContent
        expect(container).toBe("UnlockedOpen");
    });

})