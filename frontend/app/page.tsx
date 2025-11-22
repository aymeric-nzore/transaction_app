"use client";
import { useEffect, useState } from "react";
import api from "./api";
import toast, { Toaster } from "react-hot-toast";
import {
  Activity,
  ArrowDownCircle,
  ArrowUpCircle,
  PlusCircle,
  Trash,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
type Transactions = {
  id: string;
  text: string;
  amount: number;
  created_at: string;
};
export default function Home() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [text, setText] = useState<string>("");
  const [amounts, setAmounts] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const getTransactions = async () => {
    try {
      const res = await api.get<Transactions[]>("transactions/");
      setTransactions(res.data);
      console.log("succes");
      toast.success("Transactions chargés");
    } catch (error) {
      console.error("Erreur", error);
      toast.error("Erreur chargement transactions");
    }
  };
  const deleteTransactions = async (id: string) => {
    try {
      await api.delete(`transactions/${id}/`);
      getTransactions();
      toast.success("Transactions supprimée avec succes");
    } catch (error) {
      console.error("Erreur", error);
      toast.error("Erreur Suppression transactions");
    }
  };

  const addTransactions = async () => {
    if (!text || amounts === "" || isNaN(Number(amounts))) {
      toast.error("Merci de remplir texte et montant valides");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post<Transactions[]>(`transactions/`, {
        text,
        amount: Number(amounts),
      });
      getTransactions();
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      toast.success("Transactions Ajouté avec succes");
      setText("");
      setAmounts("");
    } catch (error) {
      console.error("Erreur", error);
      toast.error("Erreur ajout transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const amount = transactions.map((t) => Number(t.amount) || 0);
  const balance = amount.reduce((acc, item) => acc + item, 0) || 0;
  const income =
    amount.filter((a) => a > 0).reduce((acc, item) => acc + item, 0) || 0;
  const expense =
    amount.filter((a) => a < 0).reduce((acc, item) => acc + item, 0) || 0;
  const ratio =
    income > 0 ? Math.min((Math.abs(expense) / income) * 100, 100) : 0;
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="w-full md:w-2/3 lg:w-1/2 max-w-4xl p-4 mx-auto flex flex-col gap-4">
      <div className="flex justify-between rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
        <div className="flex flex-col gap-1">
          <div className="badge badge-soft">
            <Wallet className="h-4 w-4" />
            Votre solde
          </div>
          <div className="stat-value">{balance.toFixed(2)} $</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="badge badge-soft badge-success">
            <ArrowUpCircle className="h-4 w-4" />
            Revenus
          </div>
          <div className="stat-value">{income.toFixed(2)} $</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="badge badge-soft badge-error">
            <ArrowDownCircle className="h-4 w-4" />
            Dépenses
          </div>
          <div className="stat-value">{expense.toFixed(2)} $</div>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
        <div className="flex justify-between items-center mb-1">
          <div className="badge badge-soft badge-warning gap-1">
            <Activity className="h-4 w-4" />
            Dépenses vs Revenus
          </div>
          <div>{ratio.toFixed(0)} %</div>
        </div>
        <progress
          className="progress progress-warning w-full"
          value={ratio}
          max={100}
        ></progress>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-warning"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          ).showModal()
        }
      >
        <PlusCircle className="h-4 w-4" />
        Ajouter une Transaction
      </button>
      <div className="overflow-x-auto rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={t.id}>
                <th>{index + 1}</th>
                <td>{t.text}</td>
                <td className="gap-2 font-semibold flex">
                  {t.amount > 0 ? (
                    <TrendingUp className="text-success w-6 h-6" />
                  ) : (
                    <TrendingDown className="text-error w-6 h-6" />
                  )}
                  {t.amount}
                </td>
                <td>{formatDate(t.created_at)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-soft btn-error"
                    title="Supprimer"
                    onClick={() => deleteTransactions(t.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_3" className="modal backdrop-blur">
        <div className="modal-box border-2 border-warning/10 border-dashed">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Ajouter une Transaction</h3>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <label className="label">Texte</label>
              <input
                type="text"
                name="text"
                placeholder="Entrez le texte ..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="input w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label">
                Montant (négatif - dépenses , positif - revenus)
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Entrez le montant ..."
                value={amounts}
                onChange={(e) =>
                  setAmounts(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="input w-full"
              />
            </div>
            <button
              className="w-full btn btn-warning"
              onClick={addTransactions}
              disabled={loading}
            >
              <PlusCircle className="w-4 h-4" />
              Ajouter
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
