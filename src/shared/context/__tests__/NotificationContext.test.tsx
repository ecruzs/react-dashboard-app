import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNotification } from '@/shared/context/notification';
import { NotificationProvider } from '@/shared/context/notification/NotificationProvider';

describe('NotificationContext', () => {
  it('should provide initial notification state', () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: NotificationProvider,
    });

    expect(result.current.notification).toBeNull();
  });

  it('should show success notification', () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: NotificationProvider,
    });

    act(() => {
      result.current.showNotification({
        type: 'success',
        message: 'Operation successful'
      });
    });

    expect(result.current.notification).toMatchObject({
      type: 'success',
      message: 'Operation successful'
    });
  });

  it('should show error notification', () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: NotificationProvider,
    });

    act(() => {
      result.current.showNotification({
        type: 'error',
        message: 'Operation failed'
      });
    });

    expect(result.current.notification).toMatchObject({
      type: 'error',
      message: 'Operation failed'
    });
  });

  it('should show info notification', () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: NotificationProvider,
    });

    act(() => {
      result.current.showNotification({
        type: 'info',
        message: 'Important information'
      });
    });

    expect(result.current.notification).toMatchObject({
      type: 'info',
      message: 'Important information'
    });
  });

  it('should override previous notification with new one', () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: NotificationProvider,
    });

    act(() => {
      result.current.showNotification({
        type: 'success',
        message: 'First notification'
      });
    });

    expect(result.current.notification).toMatchObject({
      type: 'success',
      message: 'First notification'
    });

    act(() => {
      result.current.showNotification({
        type: 'error',
        message: 'Second notification'
      });
    });

    expect(result.current.notification).toMatchObject({
      type: 'error',
      message: 'Second notification'
    });
  });

  it('should handle empty message', () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: NotificationProvider,
    });

    act(() => {
      result.current.showNotification({
        type: 'info',
        message: ''
      });
    });

    expect(result.current.notification).toMatchObject({
      type: 'info',
      message: ''
    });
  });
});