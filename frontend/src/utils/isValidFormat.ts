import i18n from '@/i18n';

export const URL_REGEX =
  /^(?:(?:https?:\/\/)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(?:\/[^\s]*)?)|(?:ipfs:\/\/[a-f0-9]+(?:\/[a-zA-Z0-9_]+)*)$|^$/;
export const HASH_REGEX = /^[0-9A-Fa-f]+$/;
export const PAYMENT_ADDRESS_REGEX = /addr1[a-z0-9]+/i;

export function isValidURLLength(s: string) {
  if (s.length > 128) {
    return i18n.t('forms.errors.tooLongUrl');
  }

  const encoder = new TextEncoder();
  const byteLength = encoder.encode(s).length;

  return byteLength <= 128 ? true : i18n.t('forms.errors.tooLongUrl');
}

export const isReceivingAddress =
  // TODO: change any to Address type from '@emurgo/cardano-serialization-lib-asmjs'
  (getAddress: (address: string) => any) => async (address?: string) => {
    try {
      if (!address) {
        return true;
      }
      const receivingAddress = getAddress(address);

      return receivingAddress
        ? true
        : i18n.t('forms.errors.mustBeReceivingAddress');
    } catch {
      return i18n.t('forms.errors.mustBeReceivingAddress');
    }
  };
