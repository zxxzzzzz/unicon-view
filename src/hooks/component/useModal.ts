import { h, VNode, ref, VNodeArrayChildren, defineComponent, nextTick } from 'vue';

interface Constructor<P = any> {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  new (...args: any[]): {
    $props: P;
  };
}
type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any);
type RawSlots = {
  [name: string]: unknown;
  $stable?: boolean;
  /* Excluded from this release type: _ctx */
  /* Excluded from this release type: _ */
};

export function useModal<P>(type: Constructor<P>, props?: P, slot?: RawChildren | RawSlots) {
  const tProps = ref<any>({ ...props });
  let modalRef = { close: () => {}, open: () => {} };
  const open = async <T>(openProps?: P) => {
    const promise = new Promise<T>((resolve, reject) => {
      const onSure = async (v: T) => {
        await modalRef?.close?.();
        resolve(v);
      };
      const onCancel = async (v: T) => {
        await modalRef?.close?.();
        reject(v);
      };
      tProps.value = { ...tProps.value, onCancel, onSure, ...(openProps || {}) };
    });
    // props更新后再打开
    nextTick(() => {
      modalRef?.open?.();
    });
    return promise;
  };

  const Modal = defineComponent({
    setup: function () {},
    data() {
      return {
        tProps,
      };
    },
    mounted() {
      modalRef = this.$refs['modal'] as any;
    },
    render() {
      return h(type, { ...this.tProps, ref: 'modal' }, slot);
    },
  });

  return { Modal, open };
}
