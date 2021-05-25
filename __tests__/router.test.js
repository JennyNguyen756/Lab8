/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';

 test('length of history stack and settings state', () => {
     pushToHistory('settings');
     expect(history.length).toBe(2);
     expect(history.state).toEqual({ page: 'settings' });
 })

 test('length of history stack and entry state', () => {
    pushToHistory('entry', 1);
    expect(history.length).toBe(3);
    expect(history.state).toEqual({ page: 'entry1' });
})

test('length of history stack and default state', () => {
    pushToHistory('');
    expect(history.length).toBe(4);
    expect(history.state).toEqual({});
})