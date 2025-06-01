import { createContext, useContext, useRef, useState } from "react";

type ConfirmHandler = (...args: any[]) => Promise<void> | void;

interface DialogConfig {
  title?: string;
  message?: string;
  confirmText?: string;
  color?: "primary" | "error" | "warning" | "success";
  onConfirm: ConfirmHandler;
  params?: any[];
}


interface MyDialogContextType {
  open: (config: DialogConfig) => void;
  close: () => void;
  runConfirm: () => Promise<void>;
  isOpen: boolean;
  config: Omit<DialogConfig, "onConfirm" | "params">;
}

const MyDialogContext = createContext<MyDialogContextType | null>(null);


export const MyDialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<Omit<DialogConfig, "onConfirm" | "params">>({});
    const [isOpen, setIsOpen] = useState(false);
  const handlerRef = useRef<ConfirmHandler | null>(null);
  const paramsRef = useRef<any[]>([]);
  const open = (dialogConfig: DialogConfig) => {
    handlerRef.current = dialogConfig.onConfirm;
    paramsRef.current = dialogConfig.params || [];
    setConfig({
      title: dialogConfig.title,
      message: dialogConfig.message,
      confirmText: dialogConfig.confirmText,
      color: dialogConfig.color,
    });
    setIsOpen(true);
  };

  const close = () => {
    handlerRef.current = null;
    paramsRef.current = [];
    setIsOpen(false);
  };

  const runConfirm = async () => {
    if (handlerRef.current) {
      await handlerRef.current(...paramsRef.current);
    }
    close();
  };

  
  return (
    <MyDialogContext.Provider value={{ open, close, runConfirm, isOpen, config }}>
      {children}
    </MyDialogContext.Provider>
  );

}
  
export const useMyDialog = () => {
  const ctx = useContext(MyDialogContext);
  if (!ctx) throw new Error("useGlobalDialog must be used inside GlobalDialogProvider");
  return ctx;


};
