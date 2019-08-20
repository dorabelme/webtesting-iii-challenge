// Test away!
import React from 'react';
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';
import Controls from "./Controls";

afterEach(rtl.cleanup);

describe('testing <Controls /> component', () => {
    it('renders without crashing', () => {
        rtl.render(<Controls />);
    })

    it('open and unlocked', () => {
        const closeSpy = jest.fn();
        const lockSpy = jest.fn();

        const { getByText } = rtl.render(<Controls closed={false} locked={false} toggleClosed={closeSpy} toggleLocked={lockSpy} />);
        const closeBtn = getByText(/close gate/i);
        const lockedBtn = getByText(/lock gate/i);

        expect(closeBtn.disabled).toBeFalsy();
        expect(lockedBtn.disabled).toBeTruthy();

        rtl.fireEvent.click(closeBtn);
        expect(closeSpy).toBeCalled();
        rtl.fireEvent.click(lockedBtn);
        expect(lockSpy).not.toBeCalled();
    })

    it('closed and unlocked', () => {
        const closeSpy = jest.fn();
        const lockSpy = jest.fn();

        const { getByText } = rtl.render(<Controls closed={true} locked={false} toggleClosed={closeSpy} toggleLocked={lockSpy} />);
        const closeBtn = getByText(/open gate/i);
        const lockedBtn = getByText(/lock gate/i);

        // checking button disabled status
        expect(closeBtn.disabled).toBeFalsy();
        expect(lockedBtn.disabled).toBeFalsy();

        // checking button clock events
        rtl.fireEvent.click(closeBtn);
        expect(closeSpy).toBeCalled();
        rtl.fireEvent.click(lockedBtn);
        expect(lockSpy).toBeCalled();
    })

    it('closed and locked', () => {
        const closeSpy = jest.fn();
        const lockSpy = jest.fn();

        const { getByText } = rtl.render(<Controls closed={true} locked={true} toggleClosed={closeSpy} toggleLocked={lockSpy} />);
        const closeBtn = getByText(/open gate/i);
        const lockedBtn = getByText(/unlock gate/i);

        // checking button disabled status
        expect(closeBtn.disabled).toBeTruthy();
        expect(lockedBtn.disabled).toBeFalsy();

        // checking button clock events
        rtl.fireEvent.click(closeBtn);
        expect(closeSpy).not.toBeCalled();
        rtl.fireEvent.click(lockedBtn);
        expect(lockSpy).toBeCalled();
    })

    it("provide buttons to toggle the closed and locked states", async () => {
        const wrapper = rtl.render(<Controls locked={false} closed={false} />);
        let closeBtn = wrapper.getByTestId('toggle-closed');
        let lockBtn = wrapper.getByTestId('toggle-locked');

        expect(closeBtn).toBeDefined();
        expect(lockBtn).toBeDefined();
    })

    it("buttons' text changes to reflect the state", async () => {
        let wrapper = rtl.render(<Controls locked={false} closed={false} />);
        let closeBtn = wrapper.getByTestId('toggle-closed');
        let lockBtn = wrapper.getByTestId('toggle-locked');

        expect(closeBtn.textContent).toBe("Close Gate");
        expect(lockBtn.textContent).toBe("Lock Gate");

        await rtl.fireEvent.click(closeBtn);
        await rtl.fireEvent.click(lockBtn);
        rtl.cleanup();

        wrapper = rtl.render(<Controls locked={true} closed={true} />);
        closeBtn = wrapper.getByTestId('toggle-closed');
        lockBtn = wrapper.getByTestId('toggle-locked');

        expect(closeBtn.textContent).toBe("Open Gate");
        expect(lockBtn.textContent).toBe("Unlock Gate");

        await rtl.fireEvent.click(closeBtn);
        await rtl.fireEvent.click(lockBtn);
    })

    it("cannot be closed or opened if it is locked and cannot be locked if opened", async () => {
        let wrapper = rtl.render(<Controls locked={true} closed={true} />);
        let button = wrapper.getByTestId('toggle-closed');

        await rtl.fireEvent.click(button);
        expect(button.disabled).toBeTruthy();
        rtl.cleanup();

        wrapper = rtl.render(<Controls locked={false} closed={false} />);
        button = wrapper.getByTestId('toggle-locked');

        await rtl.fireEvent.click(button);
        expect(button.disabled).toBe(true);
    })
})