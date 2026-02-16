import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InnerPageLayout from "@/components/drip/InnerPageLayout";

const subjects = ["just saying hi", "catering inquiry", "event space", "collab / partnership", "feedback", "other"];

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <InnerPageLayout
      heading={<>say <span className="text-primary">hey</span></>}
      sub="questions, love letters, complaints (jk pls be nice), or just wanna chat."
    >
      <section className="max-w-xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-teal p-8 text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-accent/20 mx-auto flex items-center justify-center text-accent text-2xl"
              >
                ✓
              </motion.div>
              <h3 className="font-heading font-bold text-xl text-accent lowercase">sent!</h3>
              <p className="text-foreground/50 text-sm lowercase">we'll hit you back soon ✨</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="glass-heavy p-8 md:p-10 space-y-6"
            >
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">name</label>
                <input type="text" placeholder="what should we call you?" className="glass-input w-full px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">email</label>
                <input type="email" placeholder="so we can write back" className="glass-input w-full px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">subject</label>
                <select className="glass-input w-full px-4 py-3 text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23E8D5B7%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]">
                  <option value="" className="bg-[#111] text-foreground">choose one...</option>
                  {subjects.map((s) => <option key={s} value={s} className="bg-[#111] text-foreground">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">message</label>
                <textarea rows={5} placeholder="tell us everything" className="glass-input w-full px-4 py-3 text-sm resize-none" />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground rounded-full py-4 font-heading font-semibold lowercase text-base glow-orange hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                send it
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </InnerPageLayout>
  );
};

export default ContactPage;
