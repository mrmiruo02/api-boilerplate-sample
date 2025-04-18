import NoDataFoundError from '../errors/NoDataFoundError.ts';
import { CryptUpdateArboMasterlistResModel } from '../model/crypt/updateArboMasterlistCrypt.model.ts';
import { UpdateArboMasterlistResModel } from '../model/response/updateArboMasterlistRes.model.ts';
import DB from '../service/db.service.ts';

const updateArboMasterlist = async (param: CryptUpdateArboMasterlistResModel[]) => {
  const placeholders = param.map(() => '?').join(',');
  const searchParam = param.map((item) => item.id);
  const searchPrimary = `SELECT arbo_master_primary_key FROM arbo_masterlist WHERE id IN (${placeholders})`;
  const query = `INSERT INTO arbo_masterlist (
      arbo_master_primary_key,
      id,
      region_name,
      region_code,
      province_name,
      province_code,
      muncity_name,
      muncity_code,
      barangay_name,
      barangay_code,
      cd,
      arc_type,
      arc_id,
      arc_name,
      arc_cluster_name,
      arbo_name,
      arbo_id,
      oma_level_2013,
      itema_status_2019,
      itema_level_2019,
      itema_status_current,
      itema_level_current,
      organization_status,
      organization_type,
      year_organized,
      registering_agency,
      year_registration,
      baseline_members,
      baseline_members_male,
      baseline_members_female,
      baseline_total_arbs,
      baseline_male_arbs,
      baseline_female_arbs,
      baseline_total_nonarbs,
      baseline_male_nonarbs,
      baseline_female_nonarbs,
      current_members,
      current_members_male,
      current_members_female,
      current_total_arbs,
      current_male_arbs,
      current_female_arbs,
      current_total_nonarbs,
      current_male_nonarbs,
      current_female_nonarbs,
      cbu_current,
      cbu_mem_current,
      savings_current,
      sav_mem_current,
      assets_current,
      liabilities_current,
      services_provided,
      trainings_cap_dev,
      apcp,
      linksfarm,
      up_valuing,
      cp_wash,
      coop_strengthening,
      vlcep, 
      vlfed,
      pbd_lawyering,
      social_entrep,
      sustainable_debris,
      sustainable_livelihood,
      climate_proofing,
      pahp,
      cbvcd,
      fbs,
      pilot_climate_proof,
      cap_pbd,
      card,
      watsan,
      pablo,
      micoop,
      malp,
      csf,
      aes,
      bds,
      pamana,
      bub_dar,
      arf,
      sbfp,
      claap,
      arbold,
      total_1,
      arcdp_i,
      arcdp_ii,
      arcp_i,
      arcp_ii,
      arisp_i,
      arisp_ii,
      arisp_iii,
      bcsea_bazal,
      bcsea_umiray,
      birasp,
      cmarprp,
      converge,
      iarcdsp,
      minsaad,
      nmciremp,
      papsra,
      spots,
      spots_ii,
      starcm,
      tpkp,
      wmcip,
      total_2,
      grand_total,
      remarks,
      status,
      time_stamp
  )
  VALUES ? 
  ON DUPLICATE KEY UPDATE
      id = VALUES (id),
      region_name = VALUES(region_name),
      region_code = VALUES(region_code),
      province_name = VALUES(province_name),
      province_code = VALUES(province_code),
      muncity_name = VALUES(muncity_name),
      muncity_code = VALUES(muncity_code),
      barangay_name = VALUES(barangay_name),
      barangay_code = VALUES(barangay_code),
      cd = VALUES(cd),
      arc_type = VALUES(arc_type),
      arc_id = VALUES(arc_id),
      arc_name = VALUES(arc_name),
      arc_cluster_name = VALUES(arc_cluster_name),
      arbo_name = VALUES(arbo_name),
      arbo_id = VALUES(arbo_id),
      oma_level_2013 = VALUES(oma_level_2013),
      itema_status_2019 = VALUES(itema_status_2019),
      itema_level_2019 = VALUES(itema_level_2019),
      itema_status_current = VALUES(itema_status_current),
      itema_level_current = VALUES(itema_level_current),
      organization_type = VALUES(organization_type),
      year_organized = VALUES(year_organized),
      registering_agency = VALUES(registering_agency),
      year_registration = VALUES(year_registration),
      baseline_members = VALUES(baseline_members),
      baseline_members_male = VALUES(baseline_members_male),
      baseline_members_female = VALUES(baseline_members_female),
      baseline_total_arbs = VALUES(baseline_total_arbs),
      baseline_male_arbs = VALUES(baseline_male_arbs),
      baseline_female_arbs = VALUES(baseline_female_arbs),
      baseline_total_nonarbs = VALUES(baseline_total_nonarbs),
      baseline_male_nonarbs = VALUES(baseline_male_nonarbs),
      baseline_female_nonarbs = VALUES(baseline_female_nonarbs),
      current_members = VALUES(current_members),
      current_members_male = VALUES(current_members_male),
      current_members_female = VALUES(current_members_female),
      current_total_arbs = VALUES(current_total_arbs),
      current_male_arbs = VALUES(current_male_arbs),
      current_female_arbs = VALUES(current_female_arbs),
      current_total_nonarbs = VALUES(current_total_nonarbs),
      current_male_nonarbs = VALUES(current_male_nonarbs),
      current_female_nonarbs = VALUES(current_female_nonarbs),
      cbu_current = VALUES(cbu_current),
      cbu_mem_current = VALUES(cbu_mem_current),
      savings_current = VALUES(savings_current),
      sav_mem_current = VALUES(sav_mem_current),
      assets_current = VALUES(assets_current),
      liabilities_current = VALUES(liabilities_current),
      services_provided = VALUES(services_provided),
      trainings_cap_dev = VALUES(trainings_cap_dev),
      apcp = VALUES(apcp),
      linksfarm = VALUES(linksfarm),
      up_valuing = VALUES(up_valuing),
      cp_wash = VALUES(cp_wash),
      coop_strengthening = VALUES(coop_strengthening),
      vlcep = VALUES(vlcep), 
      vlfed = VALUES(vlfed),
      pbd_lawyering = VALUES(pbd_lawyering),
      social_entrep = VALUES(social_entrep),
      sustainable_debris = VALUES(sustainable_debris),
      sustainable_livelihood = VALUES(sustainable_livelihood),
      climate_proofing = VALUES(climate_proofing),
      pahp = VALUES(pahp),
      cbvcd = VALUES(cbvcd),
      fbs = VALUES(fbs),
      pilot_climate_proof = VALUES(pilot_climate_proof),
      cap_pbd = VALUES(cap_pbd),
      card = VALUES(card),
      watsan = VALUES(watsan),
      pablo = VALUES(pablo),
      micoop = VALUES(micoop),
      malp = VALUES(malp),
      csf = VALUES(csf),
      aes = VALUES(aes),
      bds = VALUES(bds),
      pamana = VALUES(pamana),
      bub_dar = VALUES(bub_dar),
      arf = VALUES(arf),
      sbfp = VALUES(sbfp),
      claap = VALUES(claap),
      arbold = VALUES(arbold),
      total_1 = VALUES(total_1),
      arcdp_i = VALUES(arcdp_i),
      arcdp_ii = VALUES(arcdp_ii),
      arcp_i = VALUES(arcp_i),
      arcp_ii = VALUES(arcp_ii),
      arisp_i = VALUES(arisp_i),
      arisp_ii = VALUES(arisp_ii),
      arisp_iii = VALUES(arisp_iii),
      bcsea_bazal = VALUES(bcsea_bazal),
      bcsea_umiray = VALUES(bcsea_umiray),
      birasp = VALUES(birasp),
      cmarprp = VALUES(cmarprp),
      converge = VALUES(converge),
      iarcdsp = VALUES(iarcdsp),
      minsaad = VALUES(minsaad),
      nmciremp = VALUES(nmciremp),
      papsra = VALUES(papsra),
      spots = VALUES(spots),
      spots_ii = VALUES(spots_ii),
      starcm = VALUES(starcm),
      tpkp = VALUES(tpkp),
      wmcip = VALUES(wmcip),
      total_2 = VALUES(total_2),
      grand_total = VALUES(grand_total),
      remarks = VALUES(remarks),
      status = VALUES(status),
      time_stamp = VALUES(time_stamp)`;
  const searchPrimaryResult = (await DB.execute(searchPrimary, searchParam)) as UpdateArboMasterlistResModel;

  if (searchPrimaryResult.length === 0) {
    throw new NoDataFoundError([{ message: 'data not found' }]);
  }

  const primaryKey = searchPrimaryResult.map((item) => [item.arbo_master_primary_key]);

  const searchValues: unknown[] | undefined = [];
  for (const id of primaryKey) {
    const values = param.map((item) => [
      id,
      item.id,
      item.region_name,
      item.region_code,
      item.province_name,
      item.province_code,
      item.muncity_name,
      item.muncity_code,
      item.barangay_name,
      item.barangay_code,
      item.cd,
      item.arc_type,
      item.arc_id,
      item.arc_name,
      item.arc_cluster_name,
      item.arbo_name,
      item.arbo_id,
      item.oma_level_2013,
      item.itema_status_2019,
      item.itema_level_2019,
      item.itema_status_current,
      item.itema_level_current,
      item.organization_status,
      item.organization_type,
      item.year_organized,
      item.registering_agency,
      item.year_registration,
      item.baseline_members,
      item.baseline_members_male,
      item.baseline_members_female,
      item.baseline_total_arbs,
      item.baseline_male_arbs,
      item.baseline_female_arbs,
      item.baseline_total_nonarbs,
      item.baseline_male_nonarbs,
      item.baseline_female_nonarbs,
      item.current_members,
      item.current_members_male,
      item.current_members_female,
      item.current_total_arbs,
      item.current_male_arbs,
      item.current_female_arbs,
      item.current_total_nonarbs,
      item.current_male_nonarbs,
      item.current_female_nonarbs,
      item.cbu_current,
      item.cbu_mem_current,
      item.savings_current,
      item.sav_mem_current,
      item.assets_current,
      item.liabilities_current,
      item.services_provided,
      item.trainings_cap_dev,
      item.apcp,
      item.linksfarm,
      item.up_valuing,
      item.cp_wash,
      item.coop_strengthening,
      item.vlcep,
      item.vlfed,
      item.pbd_lawyering,
      item.social_entrep,
      item.sustainable_debris,
      item.sustainable_livelihood,
      item.climate_proofing,
      item.pahp,
      item.cbvcd,
      item.fbs,
      item.pilot_climate_proof,
      item.cap_pbd,
      item.card,
      item.watsan,
      item.pablo,
      item.micoop,
      item.malp,
      item.csf,
      item.aes,
      item.bds,
      item.pamana,
      item.bub_dar,
      item.arf,
      item.sbfp,
      item.claap,
      item.arbold,
      item.total_1,
      item.arcdp_i,
      item.arcdp_ii,
      item.arcp_i,
      item.arcp_ii,
      item.arisp_i,
      item.arisp_ii,
      item.arisp_iii,
      item.bcsea_bazal,
      item.bcsea_umiray,
      item.birasp,
      item.cmarprp,
      item.converge,
      item.iarcdsp,
      item.minsaad,
      item.nmciremp,
      item.papsra,
      item.spots,
      item.spots_ii,
      item.starcm,
      item.tpkp,
      item.wmcip,
      item.total_2,
      item.grand_total,
      item.remarks,
      item.status,
      item.time_stamp,
    ]);
    searchValues.push(...searchValues, values);
  }

  const result = await DB.execute(query, searchValues);
  return result;
};

export default updateArboMasterlist;
