import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Card,
  Avatar,
  LinearProgress,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const themeColor = "#0A6A6E";

const DoctorCard = ({ review }) => {
  const rating = Number(review.avg_rating) || 0;
  const totalReviews = review.total_reviews; // can be dynamic later
  const ratingCounts = [
    Number(review.rating_5),
    Number(review.rating_4),
    Number(review.rating_3),
    Number(review.rating_2),
    Number(review.rating_1),
  ];

  const ratingPercentages = ratingCounts.map(count =>
    totalReviews ? (count / totalReviews) * 100 : 0
  );

  return (
    <Card
      sx={{
        backgroundColor: themeColor,
        color: "#fff",
        p: 2,
        borderRadius: 2,
        display: "flex",
        gap: 2,
        boxShadow: 3,
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          bgcolor: "#0fcad4",
          width: 48,
          height: 48,
          fontWeight: "bold",
        }}
      >
        {review.staff_name?.charAt(0)}
      </Avatar>

      {/* Doctor Info */}
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight="bold">
          {review.staff_name}
        </Typography>

        <Typography fontSize="12px">Specialist</Typography>

        {/* Rating */}
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Typography fontWeight="bold">
            {rating.toFixed(1)}
          </Typography>

          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              sx={{
                fontSize: 16,
                color: i < Math.round(rating) ? "#ffc107" : "#555",
              }}
            />
          ))}
        </Box>

        <Typography fontSize="12px">
          {totalReviews} review{totalReviews > 1 ? "s" : ""}
        </Typography>
      </Box>

      {/* Rating Bars (static for now) */}
      <Box sx={{ width: 160 }}>
        {[5, 4, 3, 2, 1].map((star, index) => (
          <Box
            key={star}
            display="flex"
            alignItems="center"
            gap={1}
            mb={0.4}
          >
            {/* Star label */}
            <Typography fontSize="11px" minWidth={20}>
              {star}★
            </Typography>

            {/* Progress bar */}
            <LinearProgress
              variant="determinate"
              value={ratingPercentages[index]}
              sx={{
                flex: 1,
                height: 6,
                borderRadius: 5,
                backgroundColor: "#0b4f52",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#ffc107",
                },
              }}
            />

            {/* Count number */}
            <Typography
              fontSize="11px"
              minWidth={16}
              textAlign="right"
            >
              {ratingCounts[index]}
            </Typography>
          </Box>
        ))}
      </Box>

    </Card>
  );
};


export default function AdminReviews() {
  const adminId = localStorage.getItem("adminId");

  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");



  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_ADMINPROFILE_FETCH}/${adminId}`,
        { credentials: "include" }
      );
      const json = await res.json();
      setProfile(json.data);
      console.log(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();

      const res = await fetch(
        `${process.env.REACT_APP_URL}/review/admin/reviews?${query}`,
        { credentials: "include" }
      );

      const json = await res.json();
      setReviews(json.reviews || []);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchProfile();
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No profile data found</Typography>
      </Box>
    );
  }


  return (
    <Box sx={{ p: 4, backgroundColor: "#f8f8f8" }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: themeColor,
          color: "#fff",
          px: 3,
          py: 1,
          borderRadius: 1,
          width: "fit-content",
          mb: 3,
          fontWeight: "bold",
        }}
      >
        Doctors Reviews
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        {/* <Select
          size="small"
          displayEmpty
          sx={{ minWidth: 180 }}
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <MenuItem value="">All Branches</MenuItem>

          {[...new Set(reviews.map(r => r.selected_branch))].map(branch => (
            <MenuItem key={branch} value={branch}>
              {branch}
            </MenuItem>
          ))}
        </Select> */}
        <TextField value={selectedBranch} onChange={(e)=>setSelectedBranch(e.target.value)} placeholder="Branch Name" size="small" />


        <Select
          size="small"
          displayEmpty
          sx={{ minWidth: 180 }}
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          <MenuItem value="">Doctor Name</MenuItem>

          {reviews.map(r => (
            <MenuItem key={r.staff_id} value={r.staff_id}>
              {r.staff_name}
            </MenuItem>
          ))}
        </Select>


        <Button
          variant="contained"
          sx={{
            backgroundColor: themeColor,
            textTransform: "none",
            px: 4,
          }}
          onClick={() =>
            fetchReviews({
              selected_branch: selectedBranch,
              staff_id: selectedDoctor,
            })
          }
        >
          Search
        </Button>

      </Box>

      {/* Hospital Banner */}
      <Box
        sx={{
          backgroundColor: themeColor,
          color: "#fff",
          borderRadius: 2,
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box display="flex" gap={3} alignItems="center">
          <Box
            sx={{
              width: 120,
              height: 80,
              backgroundColor: "#cfecee",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: themeColor,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            <img src={`${process.env.REACT_APP_URL}/Images/${localStorage.getItem("companyLogo")}`} alt="company-logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </Box>

          <Box>

            <Typography variant="h6">{profile?.company_name}</Typography>
            <Typography fontSize="13px">
              {profile?.address}
            </Typography>


          </Box>
        </Box>

        <Box textAlign="right">
          <Typography fontSize="14px">Total Reviews</Typography>
          <Typography variant="h6">{reviews?.length || 0}</Typography>
        </Box>
      </Box>

      {/* Doctors Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 3,
        }}
      >
        {reviews.map((review) => (
          <DoctorCard key={review.id} review={review} />
        ))}
      </Box>
    </Box>
  );
}
