import { dbinom, pbinom, qbinom, rbinom as rbinom_ } from "./distributions/dist_binom"
import { dchisq, pchisq, qchisq, rchisq as rchisq_ } from "./distributions/dist_chisq"
import { dexp, pexp, qexp, rexp as rexp_ } from "./distributions/dist_exp"
import { dgamma, pgamma, qgamma, rgamma as rgamma_ } from "./distributions/dist_gamma"
import { dgeom, pgeom, qgeom, rgeom as rgeom_ } from "./distributions/dist_geom"
import { dlnorm, plnorm, qlnorm, rlnorm as rlnorm_ } from "./distributions/dist_lnorm"
import { dnorm, pnorm, qnorm, rnorm as rnorm_ } from "./distributions/dist_norm"
import { dpois, ppois, qpois, rpois as rpois_ } from "./distributions/dist_pois"
import { dunif, punif, qunif, runif as runif_ } from "./distributions/dist_unif"
import { compose } from "ramda"

const unitVectorToScalar = function(x) {
    return (Array.isArray(x) && x.length == 1) ? x[0] : x;
};

const rbinom = compose(unitVectorToScalar, rbinom_);
const rchisq = compose(unitVectorToScalar, rchisq_);
const rexp = compose(unitVectorToScalar, rexp_);
const rgamma = compose(unitVectorToScalar, rgamma_);
const rgeom = compose(unitVectorToScalar, rgeom_);
const rlnorm = compose(unitVectorToScalar, rlnorm_);
const rnorm = compose(unitVectorToScalar, rnorm_);
const rpois = compose(unitVectorToScalar, rpois_);
const runif = compose(unitVectorToScalar, runif_);

export {
    dbinom, pbinom, qbinom, rbinom,
    dchisq, pchisq, qchisq, rchisq,
    dexp, pexp, qexp, rexp,
    dgamma, pgamma, qgamma, rgamma,
    dgeom, pgeom, qgeom, rgeom,
    dlnorm, plnorm, qlnorm, rlnorm,
    dnorm, pnorm, qnorm, rnorm,
    dpois, ppois, qpois, rpois,
    dunif, punif, qunif, runif,
}
