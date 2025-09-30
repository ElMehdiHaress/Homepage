import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';

const ResearchIntro = () => {
  const navigate = useNavigate();

  const sections = [
    { id: 'newton-langevin', title: 'From Newton to Langevin' },
    { id: 'singular-interactions', title: 'Singular interactions and dissipative confinement' },
    { id: 'beyond-physics', title: 'Beyond physics: sampling and optimization' },
    { id: 'sdes-spdes', title: 'From SDEs to SPDEs' },
    { id: 'fractional-brownian', title: 'Fractional Brownian motion' },
    { id: 'estimation-numerical', title: 'Estimation and numerical analysis' },
    { id: 'contributions', title: 'Contributions' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      position: 'relative',
      margin: 0,
      padding: '40px 20px',
      color: '#1f2937'
    }}>
      {/* Persistent Menu Bar */}
      <MenuBar />
      {/* Back to Home Button */}
      <button
        className="back-button"
        onClick={handleBackToHome}
        style={{
          position: 'fixed',
          top: '30px',
          left: '30px',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          padding: '10px 20px',
          color: '#1f2937',
          fontSize: '14px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ← Back to Home
      </button>

      {/* Table of Contents Sidebar */}
      <div 
        className="toc-sidebar"
        style={{
        position: 'fixed',
        left: '30px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        backgroundColor: 'rgba(248, 250, 252, 0.95)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        maxWidth: '250px',
        minWidth: '200px'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#374151',
          textAlign: 'center'
        }}>
          Table of Contents
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                lineHeight: '1.3'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
                e.currentTarget.style.color = '#60a5fa';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div 
        className="publications-container"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          paddingTop: '80px',
          lineHeight: '1.7'
        }}
      >
        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '50px',
          color: '#1f2937'
        }}>
          Introduction to my research
        </h1>

        {/* Content */}
        <div style={{
          fontSize: 'clamp(16px, 2.5vw, 18px)',
          lineHeight: '1.8'
        }}>
          
          <p style={{ marginBottom: '30px' }}>
            The starting point of my research is a classical question in physics:
          </p>

          <blockquote style={{
            fontSize: 'clamp(18px, 3vw, 20px)',
            fontStyle: 'italic',
            color: '#4b5563',
            borderLeft: '4px solid #60a5fa',
            paddingLeft: '20px',
            margin: '30px 0',
            backgroundColor: 'rgba(96, 165, 250, 0.05)',
            padding: '20px',
            borderRadius: '8px'
          }}>
            How can we describe the motion of a particle that is pushed by deterministic forces but constantly shaken by microscopic noise?
          </blockquote>

          <h2 
            id="newton-langevin"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginTop: '50px',
              marginBottom: '25px',
              color: '#1f2937'
            }}
          >
            From Newton to Langevin
          </h2>

          <p style={{ marginBottom: '25px' }}>
            In a frictionless world, Newton's law <em>m∂²X<sub>t</sub> = -∇V(X<sub>t</sub>)</em> rules the motion of a particle in a potential landscape <em>V</em>.
            But real particles live in a thermal environment. They experience random collisions with surrounding molecules, and the medium itself produces a drag force.
            Accounting for these effects leads to the <strong>Langevin equation</strong>:
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            margin: '25px 0',
            textAlign: 'center',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            border: '1px solid #e2e8f0'
          }}>
            <em>m∂²X<sub>t</sub> = -γ∂X<sub>t</sub> - ∇V(X<sub>t</sub>) + √(2γk<sub>B</sub>T)∂W<sub>t</sub></em>
          </div>

          <p style={{ marginBottom: '20px' }}>where</p>
          <ul style={{ marginBottom: '25px', paddingLeft: '30px' }}>
            <li><em>m</em> is the mass,</li>
            <li><em>γ</em> a friction coefficient,</li>
            <li><em>T</em> the absolute temperature,</li>
            <li><em>k<sub>B</sub></em> Boltzmann's constant,</li>
            <li>and <em>W<sub>t</sub></em> a Brownian motion modelling microscopic kicks.</li>
          </ul>

          <p style={{ marginBottom: '25px' }}>
            When inertia is negligible one arrives at the overdamped dynamics
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            margin: '25px 0',
            textAlign: 'center',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            border: '1px solid #e2e8f0'
          }}>
            <em>dX<sub>t</sub> = -∇V(X<sub>t</sub>)dt + √(2β<sup>-1</sup>)dW<sub>t</sub>, &nbsp;&nbsp;&nbsp; β=(k<sub>B</sub>T)<sup>-1</sup></em>
          </div>

          <p style={{ marginBottom: '25px' }}>
            The deterministic drift <em>-∇V</em> drives the system toward regions of low energy, while the Brownian noise ensures a continual exploration of the landscape.
          </p>

          <p style={{ marginBottom: '25px' }}>
            When the potential <em>V</em> is sufficiently regular and confining, the overdamped Langevin dynamics
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            margin: '25px 0',
            textAlign: 'center',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            border: '1px solid #e2e8f0'
          }}>
            <em>dX<sub>t</sub> = -∇V(X<sub>t</sub>)dt + √(2β<sup>-1</sup>)dB<sub>t</sub></em>
          </div>

          <p style={{ marginBottom: '25px' }}>
            is <em>expected</em> to settle, as <em>t → ∞</em>, into a statistical equilibrium described by the <strong>Gibbs distribution</strong>
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            margin: '25px 0',
            textAlign: 'center',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            border: '1px solid #e2e8f0'
          }}>
            <em>π(dx) = Z<sup>-1</sup>e<sup>-βV(x)</sup>dx</em>
          </div>

          <p style={{ marginBottom: '25px' }}>
            where <em>Z</em> is a normalizing constant.
            Formally, the law <em>ρ<sub>t</sub></em> of <em>X<sub>t</sub></em> evolves according to the <strong>Fokker–Planck equation</strong>, a partial differential equation describing how probability densities move under the combined effect of drift and diffusion:
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            margin: '25px 0',
            textAlign: 'center',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            border: '1px solid #e2e8f0'
          }}>
            <em>∂<sub>t</sub>ρ<sub>t</sub> = ∇·(ρ<sub>t</sub>∇V) + β<sup>-1</sup>Δρ<sub>t</sub></em>
          </div>

          <p style={{ marginBottom: '25px' }}>
            A direct computation shows that the Gibbs density makes the right–hand side vanish, so it is a stationary solution of this PDE.
            When <em>V</em> is smooth and grows sufficiently at infinity, one can indeed prove that <em>ρ<sub>t</sub></em> converges to this stationary law.
            For rougher or merely distributional drifts the situation is far subtler, and even identifying a meaningful invariant measure is a delicate mathematical problem.
          </p>

          <h2 
            id="singular-interactions"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginTop: '50px',
              marginBottom: '25px',
              color: '#1f2937'
            }}
          >
            Singular interactions and dissipative confinement
          </h2>

          <p style={{ marginBottom: '25px' }}>
            In many models the potential <em>V</em> splits naturally into two components:
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            margin: '25px 0',
            textAlign: 'center',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            border: '1px solid #e2e8f0'
          }}>
            <em>V = V<sub>sing</sub> + V<sub>conf</sub></em>
          </div>

          <ul style={{ marginBottom: '25px', paddingLeft: '30px' }}>
            <li style={{ marginBottom: '15px' }}>
              <strong>V<sub>sing</sub></strong> encodes <em>strong local interactions</em>—for example Coulomb or Riesz–type forces where the repulsion behaves like <em>|x|<sup>-α</sup></em> or <em>-log|x|</em> at short range.
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>V<sub>conf</sub></strong> provides <em>global dissipation or confinement</em>, e.g. a quadratic trap that prevents the system from escaping to infinity.
            </li>
          </ul>

          <p style={{ marginBottom: '20px' }}>This combination appears in:</p>
          <ul style={{ marginBottom: '25px', paddingLeft: '30px' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>interacting particle systems</strong> (plasmas, vortices, Bose gases) where charged particles repel strongly at small distances but remain confined by an external field;
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>log–gases and random matrices</strong>, whose eigenvalues interact through a logarithmic repulsion balanced by a smooth trapping potential;
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>mean–field limits</strong> of large populations, where the empirical distribution solves a McKean–Vlasov equation driven by a singular kernel and a confining drift.
            </li>
          </ul>

          <h2 
            id="beyond-physics"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginTop: '50px',
              marginBottom: '25px',
              color: '#1f2937'
            }}
          >
            Beyond physics: sampling and optimization
          </h2>

          <p style={{ marginBottom: '25px' }}>
            The same dynamics plays a central role in modern data science.
            In <strong>Bayesian statistics</strong> and <strong>machine learning</strong> one often needs to <em>sample</em> from a probability law <em>π(dx)∝ e<sup>-V(x)</sup>dx</em>.
            The Langevin SDE is tailor-made for this: its long-time distribution is precisely <em>π</em>.
          </p>

          <p style={{ marginBottom: '25px' }}>
            Discretizing the equation (Euler–Maruyama) yields algorithms such as the <em>Unadjusted Langevin Algorithm</em> (ULA) or <em>Metropolis–adjusted Langevin Algorithm</em> (MALA), which combine gradient descent and stochastic exploration.
            The drift pulls toward regions of high probability, while the noise prevents the chain from getting stuck in local minima, giving rigorous convergence guarantees when <em>V</em> satisfies appropriate regularity or convexity conditions.
            When <em>V</em> includes singular interaction terms—as in high-dimensional particle samplers or strongly regularized posteriors—analysing stability and convergence becomes highly non-trivial.
          </p>

          <h2 
            id="sdes-spdes"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginTop: '50px',
              marginBottom: '25px',
              color: '#1f2937'
            }}
          >
            From SDEs to SPDEs
          </h2>

          <p style={{ marginBottom: '25px' }}>
            Some deterministic equations are so irregular that they admit many different solutions.
            A classical toy example is
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            margin: '25px 0',
            textAlign: 'center',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            border: '1px solid #e2e8f0'
          }}>
            <em>y'(t) = √y(t), &nbsp;&nbsp;&nbsp; y(0) = 0</em>
          </div>

          <p style={{ marginBottom: '25px' }}>
            for which every function that stays at zero for a while and then follows the deterministic trajectory is a valid solution—uniqueness completely fails.
            If we perturb this equation by a small Brownian noise, and consider the stochastic differential equation (SDE):
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            margin: '25px 0',
            textAlign: 'center',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            border: '1px solid #e2e8f0'
          }}>
            <em>dy<sub>t</sub> = √y<sub>t</sub> dt + dW<sub>t</sub></em>
          </div>

          <p style={{ marginBottom: '25px' }}>
            the randomness "smooths out" the dynamics and, remarkably, restores <strong>pathwise uniqueness</strong> and existence of a well-defined solution.
            This simple observation underlies much of the modern theory of singular stochastic equations: noise, far from merely adding randomness, can <em>stabilise</em> ill-posed problems and allow us to make rigorous sense of models with drifts that are singular or even distributional (e.g. the SDE <em>dX<sub>t</sub> = δ<sub>0</sub>(X<sub>t</sub>) dt + dW<sub>t</sub></em> admits as a solution the reflected Brownian motion where <em>δ<sub>0</sub></em> is the Dirac distribution at 0). 
            <strong> Regularisation by noise</strong> is a phenomenon that helps us understand SDEs that involve a singular drift (singular potential).
          </p>

          <p style={{ marginBottom: '25px' }}>
            The same "singular + dissipative" structure also drives many <strong>stochastic partial differential equations</strong> (SPDEs), where noise acts both in space and time.
          </p>

          <ul style={{ marginBottom: '25px', paddingLeft: '30px' }}>
            <li style={{ marginBottom: '15px' }}>
              The <strong>Allen–Cahn equation</strong> models phase separation in a binary alloy.
              Its drift contains a singular non-linear reaction term (double-well potential favouring two stable phases) and a Laplacian providing spatial dissipation.
              Adding space–time white noise captures thermal fluctuations of the interface.
            </li>
            <li style={{ marginBottom: '15px' }}>
              The <strong>Cahn–Hilliard equation</strong> describes the evolution of a conserved order parameter.
              Here the drift involves the Laplacian of a double-well potential, again mixing a strongly non-linear (singular) term with a dissipative fourth-order operator.
              The stochastic version models microscopic noise in spinodal decomposition or thin-film growth.
            </li>
          </ul>

          <p style={{ marginBottom: '25px' }}>
            These SPDEs exhibit an additional difficulty as the noise is rough in both time and space. 
            <p style={{ marginBottom: '25px' }}>
            Having <strong>two drifts of very different nature</strong>—one singular, one dissipative—creates a delicate balance:
          </p>
          <ul style={{ marginBottom: '40px', paddingLeft: '30px' }}>
            <li style={{ marginBottom: '15px' }}>
              The singular part may be merely <em>distributional</em>, so classical well-posedness theorems for SDEs/SPDEs fail and we rely on regularisation by noise techniques.
            </li>
            <li style={{ marginBottom: '15px' }}>
              The dissipative component is the mechanism that prevents blow-up and ensures long-time ergodicity.
            </li>
            <li style={{ marginBottom: '15px' }}>
              Studying the long-time behaviour of these equations typically requires understanding how the singularity effect and the dissipative component interact.
            </li>
          </ul>
          </p>

          <h2 
            id="fractional-brownian"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginTop: '50px',
              marginBottom: '25px',
              color: '#1f2937'
            }}
          >
            Fractional Brownian motion
          </h2>

          <p style={{ marginBottom: '25px' }}>
            While the classical Langevin equation is driven by standard Brownian motion—whose increments are independent and memoryless—many real systems exhibit long–range temporal correlations.
            For example, in turbulent flows, financial markets, or biological materials, the intensity of random fluctuations today often depends on the fluctuations of the past.
          </p>

          <p style={{ marginBottom: '25px' }}>
            A natural model for such non-Markovian noise is fractional Brownian motion (fBm) <em>B<sub>t</sub><sup>H</sup></em> with Hurst parameter <em>H ∈ (0,1)</em>.
            Unlike standard Brownian motion (<em>H = 1/2</em>), fBm has:
          </p>

          <ul style={{ marginBottom: '25px', paddingLeft: '30px' }}>
            <li style={{ marginBottom: '15px' }}>
              <strong>stationary but correlated increments</strong>: <em>E[(B<sub>t</sub><sup>H</sup> - B<sub>s</sub><sup>H</sup>)(B<sub>u</sub><sup>H</sup> - B<sub>v</sub><sup>H</sup>)] ≠ 0</em> even when the intervals don't overlap;
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>persistence when H &gt; 1/2</strong> (positive correlation, rough but smoother than Brownian);
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>anti-persistence when H &lt; 1/2</strong> (negative correlation, even rougher paths).
            </li>
          </ul>

          <p style={{ marginBottom: '25px' }}>
            Replacing Brownian motion by fBm in a Langevin-type equation captures memory effects in the forcing and leads to dynamics that are not Markovian.
            This profoundly changes both the analysis and the long-time behaviour:
          </p>

          <ul style={{ marginBottom: '25px', paddingLeft: '30px' }}>
            <li style={{ marginBottom: '10px' }}>
              there is no semigroup or generator in the classical sense,
            </li>
            <li style={{ marginBottom: '10px' }}>
              ergodic properties depend on <em>H</em>,
            </li>
            <li style={{ marginBottom: '10px' }}>
              regularization by noise can be stronger or weaker depending on the roughness of the driving path.
            </li>
          </ul>

          <p style={{ marginBottom: '25px' }}>
            Such fractional models are increasingly relevant in physics (viscoelastic materials, anomalous diffusion), quantitative finance (volatility with memory), and engineering (network traffic, power grids).
            They also serve as testbeds for new stochastic calculus tools—Young integrals, rough paths, Malliavin techniques—needed to control singular drifts in a non-Markovian environment.
          </p>

          <h2 
            id="estimation-numerical"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginTop: '50px',
              marginBottom: '25px',
              color: '#1f2937'
            }}
          >
            Estimation and numerical analysis
          </h2>

          <p style={{ marginBottom: '25px' }}>
            Beyond proving that these stochastic equations are well posed, a central question is how to estimate their parameters and simulate them reliably.
            In many applications—ranging from molecular dynamics to climate modelling or Bayesian inference—the coefficients of the drift are not known exactly and must be inferred from data.
            Because the Gibbs measure is the long-time law of the dynamics, statistics collected from long trajectories naturally encode information about the potential <em>V</em> and the physical parameters (temperature, interaction strength, dissipation).
            Accurate estimation therefore requires a deep understanding of the long-time behaviour of the SDE/SPDE, including rates of convergence to equilibrium and ergodic properties.
          </p>

          <p style={{ marginBottom: '25px' }}>
            From a computational perspective, one must design and analyse numerical schemes that preserve these properties.
            For instance, discretizations such as the Euler–Maruyama or splitting methods must be stable over large time horizons and reproduce the correct invariant measure, or at least approximate it with controlled bias.
            This is essential both for sampling (where the Gibbs distribution is the quantity of interest) and for parameter estimation (where ergodic averages are used to recover physical constants).
            The presence of a singular drift makes this analysis delicate: step–size restrictions, regularity of the invariant law, and robustness to noise all interact in subtle ways.
          </p>

          <h2 
            id="contributions"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginTop: '50px',
              marginBottom: '25px',
              color: '#1f2937'
            }}
          >
            Contributions
          </h2>

          <p style={{ marginBottom: '30px' }}>
            My research has explored these questions from complementary perspectives, ranging from parameter estimation to numerical analysis and connections with optimization.
          </p>

          <h3 style={{
            fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Long-time behaviour
          </h3>

          <p style={{ marginBottom: '25px' }}>
            I am currently working with Konstantinos Dareiotis and Khoa Le on understanding the long-time behaviour of solutions to SDEs with a singular and dissipative potential. 
            We have preliminary results on existence and uniqueness of invariant measures, and the rate at which the dynamics settle in the long-time.
          </p>

          <h3 style={{
            fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Estimation
          </h3>

          <p style={{ marginBottom: '25px' }}>
            I first studied the <em>fractional Ornstein–Uhlenbeck model</em> with Yaozhong Hu, where we constructed consistent estimators for several parameters of the dynamics and analysed their rates of convergence, establishing in particular a central limit theorem.
            In subsequent work with Alexandre Richard on <em>additive fractional SDEs with smooth dissipative drift</em>, we developed estimation procedures based on the invariant measure, obtaining again consistent estimators together with precise convergence rates.
          </p>

          <h3 style={{
            fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Numerical approximation
          </h3>

          <p style={{ marginBottom: '25px' }}>
            With Ludovic Goudenège and Alexandre Richard, I investigated numerical schemes for SDEs and reaction–diffusion SPDEs with distributional drifts. 
            We analysed an Euler-type discretization on finite time intervals, proved a convergence rate and discussed its optimality in this singular setting.
            In ongoing work with Ludovic Goudenège and Jonathan Naffrichoux, I focus on the design and analysis of schemes that remain accurate over the <strong>long-time horizon</strong>, preserving invariant measures and ergodic properties.
          </p>

          <h3 style={{
            fontSize: 'clamp(1.3rem, 2.8vw, 1.6rem)',
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Optimization
          </h3>

          <p style={{ marginBottom: '25px' }}>
            With Matthew Holland, I explored gradient-based algorithms for minimising <em>spectral risks</em>, which extend classical empirical risk minimization by allowing the user to calibrate risk beyond the expectation of a loss.
            When gradients of the risk are not available in closed form, I am developing, together with Jules Samaran, methods that leverage <strong>Malliavin calculus</strong> to perform gradient descent in infinite-dimensional spaces where the gradient is otherwise inaccessible.
            In parallel, with Avi Mayorcas, I am investigating how to calibrate the invariant measure of fractional SDEs so as to match prescribed Gibbs measures with singular potentials.
          </p>

        </div>
      </div>
    </div>
  );
};

export default ResearchIntro;
