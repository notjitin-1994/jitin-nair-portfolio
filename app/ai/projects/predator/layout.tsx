import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Predator Nexus V4.0 | Bayesian Multi-Agent Pantheon',
  description: 'Bayesian Multi-Agent system for deep causal inference and autonomous decision-making. Built with Python and LangGraph.',
  openGraph: {
    title: 'Predator Nexus V4.0 | Jitin Nair',
    description: 'Autonomous Bayesian agent orchestration at scale.',
    images: [{ url: '/predator-bg.jpg' }],
  },
};

export default function PredatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
