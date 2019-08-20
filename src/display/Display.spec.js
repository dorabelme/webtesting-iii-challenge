// Test away!

import React from 'react';
import Display from './Display';
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';
import { queryByText } from '@testing-library/react';
// import '@testing-library/jest-dom/extend.expect';


afterEach(rtl.cleanup);

describe('testing Display component', () => {
    it('renders without crashing', () => {
        rtl.render(<Display />)
    })

    it('displays Locked when the locked prop is true and unlocked otherwise', () => {
        let wrapper = rtl.render(<Display closed={true} locked={true} />);
        const lockedClass1 = wrapper.getByTestId('lockedClass').textContent;
        expect(lockedClass1).toBe("Locked");
        rtl.cleanup();
        wrapper = rtl.render(<Display closed={true} locked={false} />);
        const lockedClass2 = wrapper.getByTestId('lockedClass').textContent;
        expect(lockedClass2).toBe("Unlocked");
    })

    it("when locked or closed use the red-led class", () => {
        const wrapper = rtl.render(<Display closed={true} locked={true} />);
        const lockedClass = wrapper.getByTestId('lockedClass');
        const closedClass = wrapper.getByTestId('closedClass');
        expect(lockedClass.classList[1]).toBe("red-led")
        expect(closedClass.classList[1]).toBe("red-led")
    })

    it('displays closed when the closed prop is true and open otherwise', () => {
        let wrapper = rtl.render(<Display closed={true} locked={true} />);
        const closedClass1 = wrapper.getByTestId('closedClass').textContent;
        expect(closedClass1).toBe("Closed");
        rtl.cleanup();
        wrapper = rtl.render(<Display closed={false} locked={false} />);
        const closedClass2 = wrapper.getByTestId('closedClass').textContent;
        expect(closedClass2).toBe("Open");
    })

    it('open and unlocked', () => {
        const { getByText, queryByText } = rtl.render(<Display closed={false} locked={false} />)
        // check for correct text
        const unlockBtn = getByText(/unlocked/i);
        const openBtn = getByText(/open/i);
        // check for correct colors via css classes
        expect(unlockBtn.className).toMatch(/green-led/i);
        // expect(unlockBtn).toHaveClass(/green-led/i)
        // check that incorrect text does not show up in document
        expect(queryByText(/closed/i)).toBe(null);
    })

    it('closed and unlocked', () => {
        const { getByText, queryByText } = rtl.render(<Display closed={true} locked={false} />)
        // check for correct text
        const unlockBtn = getByText(/unlocked/i);
        const openBtn = getByText(/closed/i);
        // check for correct colors via css classes
        expect(unlockBtn.className).toMatch(/green-led/i);
        // expect(unlockBtn).toHaveClass(/green-led/i)
        // check that incorrect text does not show up in document
        expect(queryByText(/open/i)).toBe(null);
    })

    it('closed and locked', () => {
        const { getByText } = rtl.render(<Display closed={true} locked={true} />)
        // check for correct text
        const unlockBtn = getByText(/locked/i);
        const openBtn = getByText(/closed/i);
        // check for correct colors via css classes
        expect(unlockBtn.className).toMatch(/red-led/i);
    })

    it("when unlocked or open use the green-led class", () => {
        const wrapper = rtl.render(<Display closed={false} locked={false} />);
        const lockedClass = wrapper.getByTestId('lockedClass');
        const closedClass = wrapper.getByTestId('closedClass');
        expect(lockedClass.classList[1]).toBe("green-led");
        expect(closedClass.classList[1]).toBe("green-led");

    })
})
